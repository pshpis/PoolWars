using Microsoft.Extensions.Logging;
using Solnet.Rpc.Utilities;

namespace PoolWarsV0.Core.Services.Implementations;

public class RateLimiter : IRateLimiter
{
    private readonly Queue<Action?> _fireQueue = new();
    private readonly ILogger<RateLimiter> _logger;
    private readonly int _maxPerWaitTime;

    private readonly TimeSpan _waitTime;

    // private TaskCompletionSource _elementAddedSource;
    private int _requests;

    public RateLimiter(TimeSpan waitTime, int maxPerWaitTime, ILogger<RateLimiter> logger)
    {
        _waitTime = waitTime;
        _maxPerWaitTime = maxPerWaitTime;
        _logger = logger;
        // _elementAddedSource = new(TaskCreationOptions.RunContinuationsAsynchronously);
        Task.Run(ObserveQueue);
    }

    public void Fire()
    {
        _logger.LogInformation("SOL RPC request started");
        TaskCompletionSource tcs = new(TaskCreationOptions.RunContinuationsAsynchronously);

        // Queue action: release wait
        void QueueAction() =>
            tcs.SetResult();

        // Add self to queue
        EnqueueOperation(QueueAction);

        // Wait for queue observer to execute action
        _logger.LogDebug("Waiting for observer to allow the request");
        tcs.Task.GetAwaiter().GetResult();
        _logger.LogDebug("Queue observer allowed request to fire");

        Decrement();
    }

    public bool CanFire()
    {
        return Interlocked.CompareExchange(ref _requests, value: 0, comparand: 0) < _maxPerWaitTime;
    }

    private async void Decrement()
    {
        // Increase active request count
        Interlocked.Increment(ref _requests);

        // Wait for rate limit to decrease
        await Task.Delay(_waitTime);

        // Decrease active request count
        Interlocked.Decrement(ref _requests);
    }

    private void EnqueueOperation(Action action)
    {
        lock (_fireQueue)
        {
            // Add to queue
            _fireQueue.Enqueue(action);
        }
    }

    private async void ObserveQueue()
    {
        // ReSharper disable once FunctionNeverReturns
        for (;;)
        {
            // Wait
            await Task.Delay(50);

            try
            {
                // Count how much requests are left to the limit
                var freeSpots =
                    _maxPerWaitTime - Interlocked.CompareExchange(ref _requests, value: 0, comparand: 0);

                int queueLength;

                lock (_fireQueue)
                {
                    // Get thread queue length
                    queueLength = _fireQueue.Count;
                }

                // All queue or limit
                for (var i = 0; i < Math.Min(freeSpots, queueLength); i++)
                {
                    Action? action;

                    lock (_fireQueue)
                    {
                        _fireQueue.TryDequeue(out action);
                    }

                    // Invoke queue action
                    action?.Invoke();
                }
            }
            catch (Exception e)
            {
                _logger?.LogWarning("Exception thrown in queue observer: {Ex}", e.Message);
                // Ignore
            }
        }
        // ReSharper disable once FunctionNeverReturns
    }
}