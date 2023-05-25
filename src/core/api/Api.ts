import { useQuery } from "@apollo/client";
import { GENERIC } from "./queries";

class GenericApi {
  generic(params: any): any {
    const { loading, error, data } = useQuery<any>(GENERIC, {
      variables: {
        last: params.lastCount,
        skip: params?.skipCount,
        where: {
          class: params?.animalClass
        }
      },
    });

    return { loading, error, data };
  }
}

const genericApi = new GenericApi();

export { genericApi };