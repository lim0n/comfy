import { ILibrariesListResponse, ILibrary } from "./libraries-response.interface";

/**
 * Функция возвращает данные библиотек без лишних данных
 */
export function filterLibListByFullName (libs: ILibrary[], keyword: string): ILibrary[] {
    return libs.filter(lib => {
        return lib.FullName.toLowerCase().includes(keyword.toLowerCase())
    })
}
