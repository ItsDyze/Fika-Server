import { inject, injectable } from "tsyringe";

import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { RouteAction, StaticRouter } from "@spt-aki/di/Router";

import { IFikaRaidJoinRequestData } from "../../models/fika/routes/raid/join/IFikaRaidJoinRequestData";
import { IFikaRaidLeaveRequestData } from "../../models/fika/routes/raid/leave/IFikaRaidLeaveRequestData";
import { IFikaRaidCreateRequestData } from "../../models/fika/routes/raid/create/IFikaRaidCreateRequestData";
import { IFikaRaidServerIdRequestData } from "../../models/fika/routes/raid/IFikaRaidServerIdRequestData";
import { FikaRaidCallbacks } from "../../callbacks/FikaRaidCallbacks";

@injectable()
export class FikaRaidStaticRouter extends StaticRouter {
    constructor(
        @inject("FikaRaidCallbacks") protected fikaRaidCallbacks: FikaRaidCallbacks
    ) {
        super([
            new RouteAction(
                "/fika/raid/create",
                async (url: string, info: IFikaRaidCreateRequestData, sessionID: string, output: string): Promise<string> => {
                    return this.fikaRaidCallbacks.handleRaidCreate(url, info, sessionID);
                }
            ),
            new RouteAction(
                "/fika/raid/join",
                async (url: string, info: IFikaRaidJoinRequestData, sessionID: string, output: string): Promise<string> => {
                    return this.fikaRaidCallbacks.handleRaidJoin(url, info, sessionID);
                }
            ),
            new RouteAction(
                "/fika/raid/leave",
                async (url: string, info: IFikaRaidLeaveRequestData, sessionID: string, output: string): Promise<INullResponseData> => {
                    return this.fikaRaidCallbacks.handleRaidLeave(url, info, sessionID);
                }
            ),
            new RouteAction(
                "/fika/raid/gethost",
                async (url: string, info: IFikaRaidServerIdRequestData, sessionID: string, output: string): Promise<string> => {
                    return this.fikaRaidCallbacks.handleRaidGethost(url, info, sessionID);
                }
            ),
            new RouteAction(
                "/fika/raid/spawnpoint",
                async (url: string, info: IFikaRaidServerIdRequestData, sessionID: string, output: string): Promise<string> => {
                    return this.fikaRaidCallbacks.handleRaidSpawnpoint(url, info, sessionID);
                }
            )
        ]);
    }
}
