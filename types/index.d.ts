type ObjOnlyStringValues = { [key: string]: string }

export interface ServerOptions {
  folder?: string
  mimeTypes?: (defaultMimeTypes: ObjOnlyStringValues) => ObjOnlyStringValues | ObjOnlyStringValues
  whenNoFileFallbackToIndex?: boolean
}

export type FilesServerInstance = {
  listen(port: number, startFunction?: (port: number) => void): void
}

export default function startServer(serverOpts: ServerOptions): FilesServerInstance
