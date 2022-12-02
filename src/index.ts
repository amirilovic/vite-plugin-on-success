import kill from "tree-kill";
import createDebug from "debug";
import { ExecaChildProcess, execa } from "execa";

const debug = createDebug("vite:on-success");

const killProcess = ({
  pid,
  signal = "SIGTERM",
}: {
  pid: number;
  signal?: string;
}) =>
  new Promise((resolve) => {
    kill(pid, signal, resolve);
  });

export function onSuccess({
  command = process.env.VITE_ON_SUCCESS,
}: { command?: string } = {}) {
  debug("command: ", command);

  let onSuccessProcess: ExecaChildProcess | undefined;

  const doOnSuccessCleanup = async () => {
    if (onSuccessProcess?.pid) {
      await killProcess({
        pid: onSuccessProcess.pid,
      });
    }
    onSuccessProcess = undefined;
  };

  async function run() {
    if (typeof command === "undefined") {
      return;
    }

    await doOnSuccessCleanup();

    debug("running command: ", command);

    onSuccessProcess = execa(command, {
      shell: true,
      stdio: "inherit",
    });

    onSuccessProcess.on("exit", (code) => {
      if (code && code !== 0) {
        process.exitCode = code;
      }
    });
  }

  return {
    name: "vite:on-success",
    closeBundle: run,
  };
}
