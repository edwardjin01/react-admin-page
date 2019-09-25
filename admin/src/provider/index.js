import { stringify } from 'query-string';
import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin';

export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        switch (type) {
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    ...fetchUtils.flattenObject(params.filter),
                    _sort: field,
                    _order: order,
                    _start: (page - 1) * perPage,
                    _end: page * perPage,
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    ...fetchUtils.flattenObject(params.filter),
                    [params.target]: params.id,
                    _sort: field,
                    _order: order,
                    _start: (page - 1) * perPage,
                    _end: page * perPage,
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                const body = new FormData();
                Object.keys(params.data).forEach(key => {
                  body.append(key, params.data[key]);
                })
                options.body = body;
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
                break;
            case GET_MANY: {
                const query = {
                    id: params.ids,
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    const convertHTTPResponse = (response, type, resource, params) => {
        const { headers, json } = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                if (!headers.has('x-total-count')) {
                    throw new Error(
                        'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
                    );
                }
                return {
                    data: json,
                    total: parseInt(
                        headers
                            .get('x-total-count')
                            .split('/')
                            .pop(),
                        10
                    ),
                };
            case CREATE:
                return { data: { ...params.data, id: json.id } };
            case DELETE_MANY:
                return { data: json || [] };
            default:
                return { data: json };
        }
    };

    return (type, resource, params) => {
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(params.data),
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'DELETE',
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        const { url, options } = convertDataRequestToHTTP(
            type,
            resource,
            params
        );
        return httpClient(url, options).then(response =>
            convertHTTPResponse(response, type, resource, params)
        );
    };
};