
export async function registerUser(data: { username: string, email: string, password: string }) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;
}

export async function loginUser(data: { username: string, password: string }) {
    const formData = new URLSearchParams();
    formData.append('username', data.username);
    formData.append('password', data.password);
    // @ts-ignore
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const result = await response.json();

    if (result.access_token) {
        localStorage.setItem('access_token', result.access_token);
    }
    return result;
}

export async function logoutUser() {
    // @ts-ignore
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;
}

export async function getUser() {
    // @ts-ignore
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/current_user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;
}
