import { WorkerBuilder, BuiltWorker } from '../../types/SpaceportTypes';
declare const GenerateWorker: ({ lifecycleHooks, prebuildOptions, methods, }: WorkerBuilder) => BuiltWorker;
export default GenerateWorker;
