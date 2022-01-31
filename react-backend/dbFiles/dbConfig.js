const config = {
    user: 'Test',
    password: 'Test',
    server: 'BE1BD320',
    databse: 'Reservierungssystem',
    options: {
        trustServerCertificate: true,
        trustConnection: false,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433
}

module.exports = config;