module.exports = {
	'overrides': [
		{
			'env': {
				'browser': true,
				'es2021': true
			},
			'parserOptions': {
				'ecmaVersion': 'latest',
				'sourceType': 'module'
			},
			'extends': 'eslint:recommended',
			'files': [
				'src/**/*.js'
			],
			'rules': {
				'quotes': [
					'warn',
					'single'
				],
				'semi': [
					'error',
					'always'
				],
				'no-unused-vars': 'warn'
			}
		}
	]
};
