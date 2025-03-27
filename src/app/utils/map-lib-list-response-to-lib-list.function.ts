import { ILibrariesListResponse, ILibrary } from "./libraries-response.interface";

/**
 * Функция возвращает данные библиотек без лишних данных
 */
export function mapLibListResponseToLibList (response: ILibrariesListResponse): ILibrary[] {
    const result: ILibrary[] = [];
    response.response?.forEach((lib: ILibrary) => {
        const { FullName, ObjectAddress } = lib;
        const library = {
            FullName,
            ObjectAddress: ObjectAddress?.map(item=>({Address: item.Address}))
        };
        result.push(library);
    });
    return result;
}
