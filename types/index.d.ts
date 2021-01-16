type ObjOnlyStringValues = { [key: string]: string }

export interface ServerOptions {
  sourceFolder?: string
  mimeTypes?: (defaultMimeTypes: ObjOnlyStringValues) => ObjOnlyStringValues | ObjOnlyStringValues
  spa?: boolean
}

export type FilesServerInstance = {
  listen(port: number, startFunction?: (port: number) => void): void
}

export default function startServer(serverOpts: ServerOptions): FilesServerInstance
