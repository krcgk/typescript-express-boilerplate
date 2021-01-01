export interface Application {
  name: string
  run(): Promise<void>
}
