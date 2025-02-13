import './App.css'

function App() {
	return (
		<button
			onClick={() => {
				window.electron.store.set('foo', 'bar')
				// or
				console.log(window.electron.store.get('foo'))
			}}>
			Click Me!
		</button>
	)
}

export default App
