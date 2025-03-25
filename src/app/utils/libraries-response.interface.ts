/** Модель адреса */
export interface IAddress {
    /** Адрес */
    Address?: string;

    [key: string]: any;
}

/** Библиотека */
export interface ILibrary {
    /** Полное название библиотеки */
    FullName?: string;
    /** Полный адрес */
    ObjectAddress?: Partial<IAddress>[];

    [key: string]: any;
}

/** Модель ответа на запрос списка */
export interface ILibrariesListResponse {
    response?: ILibrary[];

    [key: string]: any;
}