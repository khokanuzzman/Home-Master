export default class NetStatus {

    static myInstance = null;

    hasInternet: boolean = false;

    static getInstance() {
        if (NetStatus.myInstance == null) {
            NetStatus.myInstance = new NetStatus();
        }
        return this.myInstance;
    }

    setNetStatus(hasInternet: boolean): void {
        this.hasInternet = hasInternet;
    }

    getNetStatus(): boolean {
        return this.hasInternet;
    }
}