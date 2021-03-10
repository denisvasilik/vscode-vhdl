import * as path from 'path';
import * as net from 'net';
import {
    workspace,
    Disposable,
    ExtensionContext
} from 'vscode';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
	StreamInfo
} from 'vscode-languageclient';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
    const executablExt = process.platform == 'win32' ? '.bat' : '';
    const executable = 'language-server' + executablExt;
    const command = context.asAbsolutePath(path.join('resources', 'bin', executable));
    const serverOptions = { command };
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'vhdl' }],
        synchronize: {
            configurationSection: 'vhdl',
            fileEvents: workspace.createFileSystemWatcher('**/.vhd')
        }
    }

    // Debug server options
    // let connectionInfo = {
    //     port: 5007
    // };
    // let serverOptions = () => {
    //     // Connect to language server via socket
    //     let socket = net.connect(connectionInfo);
    //     let result: StreamInfo = {
    //         writer: socket,
    //         reader: socket
    //     };
    //     return Promise.resolve(result);
    // };

    client = new LanguageClient(
        'vhdl',
        'VHDL',
        serverOptions,
        clientOptions
    )

    const disposable = client.start();

	context.subscriptions.push(disposable);
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}