FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 57441
EXPOSE 44372

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ../StazioneMetereologica.Web/StazioneMetereologica.Web.csproj ../StazioneMetereologica.Web/
RUN dotnet restore ../StazioneMetereologica.Web/StazioneMetereologica.Web.csproj
COPY . .
WORKDIR /src/../StazioneMetereologica.Web
RUN dotnet build StazioneMetereologica.Web.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish StazioneMetereologica.Web.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "StazioneMetereologica.Web.dll"]
