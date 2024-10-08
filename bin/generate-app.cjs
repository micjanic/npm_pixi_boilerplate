#!/usr/bin/env node

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

if (process.argv.length < 3) {
    console.log('You have to provide a name to your app.')
    console.log('For example :')
    console.log('npx create-my-boilerplate my-app')
    process.exit(1)
}

const projectName = process.argv[2]
const currentPath = process.cwd()
const projectPath = path.join(currentPath, projectName)
const git_repo = 'https://github.com/micjanic/npm_pixi_boilerplate.git'

try {
    fs.mkdirSync(projectPath)
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log(
            `The file ${projectName} already exist in the current directory, please give it another name.`
        )
    } else {
        console.log(error)
    }
    process.exit(1)
}

async function main() {
    try {
        //follow the console logs to see what each section is doing
        console.log('Downloading files...')
        execSync(`git clone --depth 1 ${git_repo} ${projectPath}`)

        process.chdir(projectPath)

        console.log('Updating package.json with project name...')
        const packageJsonPath = path.join(projectPath, 'package.json')
        let packageJson = fs.readFileSync(packageJsonPath, 'utf8')
        packageJson = packageJson.replace(/create_pixi_project/g, projectName)
        fs.writeFileSync(packageJsonPath, packageJson)

        console.log('Updating vite.config.ts with project name...')
        const viteConfigPath = path.join(projectPath, 'vite.config.ts')
        let viteConfig = fs.readFileSync(viteConfigPath, 'utf8')
        viteConfig = viteConfig.replace(/CreatePixiProject/g, projectName)
        fs.writeFileSync(viteConfigPath, viteConfig)

        console.log('Replacing entrypoint text with project name...')
        const entryComponentPath = path.join(
            projectPath,
            'src',
            'components',
            'CreatePixiProject.tsx'
        )
        const projectNamePascalCase = projectName
            .split(/[-_]/)
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1).toLocaleLowerCase()
            )
            .join('')

        let entryComponent = fs.readFileSync(entryComponentPath, 'utf8')
        entryComponent = entryComponent.replace(
            /CreatePixiProject/g,
            projectNamePascalCase
        )
        fs.writeFileSync(entryComponentPath, entryComponent)

        console.log('Updating the entrypoint file name with project name...')
        const newEntryComponentPath = path.join(
            projectPath,
            'src',
            'components',
            `${projectNamePascalCase}.tsx`
        )
        try {
            fs.renameSync(entryComponentPath, newEntryComponentPath)
            console.log('File has been renamed.')
        } catch (err) {
            console.error('Error renaming the file:', err)
        }

        console.log('Updating the app to import new entrypoint component...')
        const appComponentPath = path.join(projectPath, 'src', 'App.tsx')
        let appComponent = fs.readFileSync(appComponentPath, 'utf8')
        appComponent = appComponent.replace(
            /CreatePixiProject/g,
            projectNamePascalCase
        )
        fs.writeFileSync(appComponentPath, appComponent)

        console.log('Installing dependencies...')
        execSync('npm install')

        console.log('Removing git and the bin folder from new project.')
        execSync('npx rimraf ./.git')
        fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true })

        console.log('The installation is done, this is ready to use !')
    } catch (error) {
        console.log(error)
    }
}
main()
