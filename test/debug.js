import fetch from 'node-fetch';
    import logger from '../src/utils/logger';

    const BASE_URL = 'http://localhost:3000/api';

    const testCases = [
      {
        name: 'Successful Registration',
        endpoint: '/register',
        method: 'POST',
        body: { username: 'testuser', email: 'test@example.com', password: 'password123', role: 'user' },
        expectedStatus: 200,
      },
      {
        name: 'Duplicate Email',
        endpoint: '/register',
        method: 'POST',
        body: { username: 'testuser2', email: 'test@example.com', password: 'password123', role: 'user' },
        expectedStatus: 409,
      },
      {
        name: 'Invalid Credentials',
        endpoint: '/login',
        method: 'POST',
        body: { email: 'test@example.com', password: 'wrongpassword' },
        expectedStatus: 401,
      },
    ];

    const runTests = async () => {
      for (const testCase of testCases) {
        try {
          const response = await fetch(`${BASE_URL}${testCase.endpoint}`, {
            method: testCase.method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(testCase.body),
          });

          if (response.status !== testCase.expectedStatus) {
            logger.error(`Test case "${testCase.name}" failed: expected status ${testCase.expectedStatus}, got ${response.status}`);
            const data = await response.json();
            logger.error(`Response: ${JSON.stringify(data)}`);
          } else {
            logger.info(`Test case "${testCase.name}" passed`);
          }
        } catch (error) {
          logger.error(`Test case "${testCase.name}" failed: ${error.message}`);
        }
      }
    };

    const debugDatabase = async () => {
      try {
        const response = await fetch(`${BASE_URL}/debug`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          logger.info(`Database debugging completed: ${JSON.stringify(data)}`);
        } else {
          logger.error(`Database debugging failed: ${response.statusText}`);
        }
      } catch (error) {
        logger.error(`Database debugging failed: ${error.message}`);
      }
    };

    const main = async () => {
      await runTests();
      await debugDatabase();
    };

    main().catch(console.error);
