import js from '@eslint/js';
import nextConfig from 'eslint-config-next';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import("eslint").Linter.FlatConfig[]} */
const eslintConfig = [
	js.configs.recommended,
	...nextConfig,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			// Disable rules that often cause build warnings but not real errors
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/no-unescaped-entities': 'off',
			'react/prop-types': 'off',
			'no-console': 'off',
			'no-debugger': 'off',
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'no-restricted-imports': 'off',
			'import/no-anonymous-default-export': 'off',
		},
		ignores: ['node_modules', '.next', 'out', 'dist'],
	},
];

export default eslintConfig;
