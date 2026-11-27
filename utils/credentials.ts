type Credentials = {
    email: string;
    password: string;
};

function getCredentials(): Credentials {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    if (!email || !password) {
        throw new Error(
            "Set EVENTHUB_EMAIL and EVENTHUB_PASSWORD before running the test.",
        );
    }
    return { email, password };
}

export { getCredentials };
