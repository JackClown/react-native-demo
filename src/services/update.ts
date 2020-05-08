import CodePush, { DownloadProgressCallback, RemotePackage } from 'react-native-code-push';
import { timeout } from '@/utils';

/**
 *
 * @param key 环境key
 * @param wait 检查更新超时
 * @param downloadProgressCallback 下载进度回调
 * @returns 0 不需要更新 | 1 bundle更新 | 2 binary需要更新
 */
export async function sync(
  key: string,
  wait: number = 0,
  downloadProgressCallback?: DownloadProgressCallback
): Promise<number> {
  let updated = 0;

  await CodePush.notifyAppReady();

  let binaryUpdate: RemotePackage | undefined;
  let bundleUpdate: RemotePackage | null | undefined;

  const check = CodePush.checkForUpdate(key, pkg => (binaryUpdate = pkg)).then(pkg => (bundleUpdate = pkg));

  await timeout(check, wait, '检查更新超时, 请稍后再试');

  if (binaryUpdate) {
    updated = 2;
  } else if (bundleUpdate) {
    if (bundleUpdate.failedInstall) {
      updated = 0;
    } else {
      const localPackage = await bundleUpdate.download(downloadProgressCallback);

      await localPackage.install(CodePush.InstallMode.IMMEDIATE);

      updated = 1;
    }
  }

  return updated;
}
