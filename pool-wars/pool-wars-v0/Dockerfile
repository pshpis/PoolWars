FROM mcr.microsoft.com/dotnet/sdk:6.0 as BUILD
WORKDIR /src

COPY PoolWarsV0.sln ./

FROM mcr.microsoft.com/dotnet/aspnet:6.0 as RUNTIME
WORKDIR /app

COPY --from=BUILD /publish ./
EXPOSE 80
ENTRYPOINT ["dotnet", "PoolWarsV0.dll"]