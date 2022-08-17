import { AxiosStatic } from "axios";

export class StormGlass {
    readonly stormGlassAPIParams = 'swellDirection%2CswellHeight%2CswellPeriod%2CwaveDirection%2CwaveHeight%2CwindDirection%2CwindSpeed'
    readonly stormGlassAPISource = 'noaa'
    constructor(protected request: AxiosStatic) { }

    public async fetchPoints(lat: number, lng: number): Promise<{}> {
        this.request.get(`https://api.stormglass.io/v2/weather/point?params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}&lat=${lat}&lng=${lng}`)
        return Promise.resolve({})
    }
}