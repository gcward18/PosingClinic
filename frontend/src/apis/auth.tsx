
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

export async function loginUser(data: { email: string, password: string }) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
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
    console.log(result);
    console.log(result.session_id);
    if (result.session_id) {
        
        localStorage.setItem('access_token', result.session_id);
    }
    return result;
}

export async function logoutUser() {
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
