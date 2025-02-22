import { execSync } from 'child_process'

function execCommand(command: string): boolean {
	try {
		execSync(command, { stdio: 'ignore' })
		return true
	} catch (error) {
		return false
	}
}

async function isDockerInstalled(): Promise<boolean> {
	return execCommand('docker -v')
}

async function isDockerRunning(): Promise<boolean> {
	return execCommand('docker info')
}

function startDockerDesktop(): void {
	try {
		execSync('open -a Docker', { stdio: 'ignore' })
		console.log('Starting Docker Desktop...')
	} catch (error) {
		console.error('Failed to start Docker Desktop:', error)
		process.exit(1)
	}
}

async function waitForDockerToStart(timeout: number): Promise<boolean> {
	const startTime = Date.now()
	while (Date.now() - startTime < timeout) {
		if (await isDockerRunning()) {
			return true
		}
		await new Promise((resolve) => setTimeout(resolve, 1000)) // Check every 1 second
	}
	return false
}

async function main() {
	if (!(await isDockerInstalled())) {
		console.error('Docker is not installed. Please install Docker Desktop.')
		process.exit(1)
	}

	if (!(await isDockerRunning())) {
		startDockerDesktop()
		console.log('Waiting for Docker Desktop to start...')
		const started = await waitForDockerToStart(300000) // Wait up to 5 minutes
		if (started) {
			console.log('Docker Desktop is running.')
		} else {
			console.error('Failed to start Docker Desktop within the timeout period.')
			process.exit(1)
		}
	} else {
		console.log('Docker Desktop is already running.')
	}
}

main().catch((err) => {
	console.error('Unexpected error:', err.message)
	process.exit(1)
})
