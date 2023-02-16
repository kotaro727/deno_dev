import { Repository, Entity, Id, HttpResponse } from "./repository.ts";

const url = 'http://localhost:3000/users';
export interface User extends Entity {
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: string;
}

export const userRepository = <T extends User>(): Repository<T> => {
    const index = async (): Promise<T[]> => {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error('error.');
        }
        const users = await response.json();
        return users as T[];
    };

    const create = async (payload: T): Promise<T> => {
        const response = await fetch((url), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error('create error.');
        }
        const createdUser = await response.json();
        return createdUser as T;
    }

    const show = async (id: Id): Promise<T> => {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            throw new Error('show error.');
        }
        const user = await response.json();
        return user as T;
    }

    const update = async (payload: T): Promise<T> => {
        const response = await fetch(`${url}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error('update error.');
        }
        const updatedUser = await response.json();
        return updatedUser as T;
    }

    const destroy = async (id: Id): Promise<HttpResponse> => {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        if (!response.ok) {
            throw new Error('delete error.');
        }
        return response as HttpResponse;
    }

    return {
        index,
        create,
        show,
        update,
        destroy
    }
};
