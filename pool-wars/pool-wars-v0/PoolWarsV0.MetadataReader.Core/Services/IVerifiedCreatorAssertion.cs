namespace PoolWarsV0.MetadataReader.Core.Services;

public interface IVerifiedCreatorAssertion
{
    Task AssertCreatorVerifiedAsync(string creator);

    void AssertCreatorVerified(string creator);
}