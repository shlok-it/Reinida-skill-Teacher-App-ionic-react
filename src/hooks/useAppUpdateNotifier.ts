
import { AppUpdate, AppUpdateAvailability } from '@capawesome/capacitor-app-update';
export function useAppUpdateNotifier() {
    let UPDATE_AVAILABLE = false;
    let update_text = '';
    const getAvailableAppVersion = async () => {
        const result = await AppUpdate.getAppUpdateInfo();
        return result.updateAvailability;
    };

    const openAppStore = async () => {
        await AppUpdate.openAppStore();
    };

    const performImmediateUpdate = async () => {
        const result = await AppUpdate.getAppUpdateInfo();
        if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
            return;
        }
        if (result.immediateUpdateAllowed) {
            await AppUpdate.performImmediateUpdate();
        }
    };

    const startFlexibleUpdate = async () => {
        const result = await AppUpdate.getAppUpdateInfo();
        if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
            return;
        }
        if (result.flexibleUpdateAllowed) {
            await AppUpdate.startFlexibleUpdate();
        }
    };

    const completeFlexibleUpdate = async () => {
        await AppUpdate.completeFlexibleUpdate();
    };

    const getCurrentAppVersion = async () => {
        const result = await AppUpdate.getAppUpdateInfo();
        if (result.updateAvailability === AppUpdateAvailability.UPDATE_AVAILABLE) {
            UPDATE_AVAILABLE = true;
            update_text = 'Update now';
        }
        else {
            UPDATE_AVAILABLE = false;
        }
    }


    const startUpdate = async () => {
        const result = await AppUpdate.getAppUpdateInfo();
        if (result.updateAvailability === AppUpdateAvailability.UPDATE_AVAILABLE) {
            if (result.immediateUpdateAllowed) {
                update_text = 'Updating...';
                await AppUpdate.performImmediateUpdate().then((status) => {
                    if (status.code === 1 || status.code === 2) {
                        // this.getCurrentAppVersion();
                    }
                    else if (status.code !== 0) {
                        UPDATE_AVAILABLE = false;
                    }
                });
            }
            else if (result.flexibleUpdateAllowed) {
                await AppUpdate.startFlexibleUpdate();
            }
            else {
                await AppUpdate.completeFlexibleUpdate();
            }
        }
    }
    
    return {
        startUpdate,
        getCurrentAppVersion,
        getAvailableAppVersion,
        completeFlexibleUpdate,
        startFlexibleUpdate,
        performImmediateUpdate,
        openAppStore,
        UPDATE_AVAILABLE,
        update_text,
    };
}
