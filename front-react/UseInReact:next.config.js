module.exports = {
    async headers () {
        return [
            {
                //matching all apis
                source: '/:path*',
                headers: [
                    { key: 'Acces-Control-Allow-Credentials', value: 'true'},
                    { key: 'Acces-Control-Allow-Origin', value: '*'},
                    { key: 'Acces-Control-Allow-Methods', value: 'GET,OPTIONS, PATCH, DELETE, POST, PUT'},
                    { key: 'Acces-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'}
                ],
            },
        ];
    },
};