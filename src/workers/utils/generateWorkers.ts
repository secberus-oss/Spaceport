import { WorkerBuilder, BuiltWorker } from '../../types/SpaceportTypes';
const GenerateWorker = ({
  lifecycleHooks,
  prebuildOptions,
  methods,
}: WorkerBuilder): BuiltWorker => {
  return {
    hooks: {
      ...lifecycleHooks,
    },
    content: {
      ...methods,
    },
  };
};

export default GenerateWorker;
