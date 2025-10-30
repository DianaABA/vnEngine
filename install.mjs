#!/usr/bin/env node

/**
 * VN Engine Installer
 * One-command installer for VN Engine that sets up everything automatically
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const REPO_URL = 'https://github.com/DianaABA/vnEngine.git'

console.log('🎮 VN Engine Installer')
console.log('========================')
console.log('This will set up VN Engine and create your first visual novel project.\n')

async function main() {
  const projectName = process.argv[2]
  
  if (!projectName) {
    console.error('❌ Please provide a project name:')
    console.error('   npx vn-engine-installer my-awesome-novel')
    process.exit(1)
  }

  if (fs.existsSync(projectName)) {
    console.error(`❌ Directory "${projectName}" already exists.`)
    process.exit(1)
  }

  try {
    console.log('📥 Downloading VN Engine...')
    execSync(`git clone ${REPO_URL} vn-engine-temp`, { stdio: 'inherit' })

    console.log('\n📦 Installing engine dependencies...')
    execSync('npm install', { cwd: 'vn-engine-temp', stdio: 'inherit' })

    console.log('\n🔨 Building engine packages...')
    execSync('npm run build:packages', { cwd: 'vn-engine-temp', stdio: 'inherit' })

    console.log(`\n🎯 Creating your project: ${projectName}`)
    execSync(`node packages/cli/bin/vn.js create ${projectName}`, { 
      cwd: 'vn-engine-temp', 
      stdio: 'inherit' 
    })

    // Move project out of temp directory
    const tempProjectPath = path.join('vn-engine-temp', projectName)
    if (fs.existsSync(tempProjectPath)) {
      execSync(`cp -r "${tempProjectPath}" "${projectName}"`, { stdio: 'inherit' })
    }

    console.log(`\n📦 Installing project dependencies...`)
    execSync('npm install', { cwd: projectName, stdio: 'inherit' })

    // Cleanup temp directory
    console.log('\n🧹 Cleaning up...')
    execSync('rm -rf vn-engine-temp', { stdio: 'inherit' })

    console.log('\n✅ Success! Your visual novel project is ready!')
    console.log('\nNext steps:')
    console.log(`   cd ${projectName}`)
    console.log('   npm run dev')
    console.log('\nThen open http://localhost:3000 to see your visual novel!')
    console.log(`\nEdit public/scripts/main.json to write your story.`)
    console.log('Add images to public/assets/ folders for backgrounds and characters.')
    console.log('\nHappy storytelling! 🎉')

  } catch (error) {
    console.error('\n❌ Installation failed:', error.message)
    console.error('\nTry the manual installation method:')
    console.error('1. git clone https://github.com/DianaABA/vnEngine.git')
    console.error('2. cd vnEngine')
    console.error('3. npm install && npm run build:packages')
    console.error(`4. node packages/cli/bin/vn.js create ${projectName}`)
    process.exit(1)
  }
}

main()