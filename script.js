// GO!
addSettingsToPage()

function addSettingsToPage() {
	const editorOptionsContainer = document.querySelector('#editor-options')
	editorOptionsContainer.innerHTML += `<hr/>`

	const template = `
		<label class="checkboxCont">
			<input type="checkbox" name="{name}" {checked} data-action="{action}" data-opt="{opt}">
			<span class="checkbox"><i class="bts bt-check"></i></span>
			{label}
		</label>
	`

	const options = [
		{
			name: 'showPresentationMode',
			label: 'Presentation Mode',
			checked: '',
			action: 'togglePresentationMode'
		},
		{
			name: 'showSidebar',
			label: 'Show Sidebar',
			checked: 'checked="checked"',
			action: 'toggleSidebar'
		},
		{
			name: 'showHTMLPanel',
			label: 'Show HTML Panel',
			checked: 'checked="checked"',
			action: 'togglePanel',
			opt: 'html'
		},
		{
			name: 'showCSSPanel',
			label: 'Show CSS Panel',
			checked: 'checked="checked"',
			action: 'togglePanel',
			opt: 'css'
		},
		{
			name: 'showJavaScriptPanel',
			label: 'Show JavaScript Panel',
			checked: 'checked="checked"',
			action: 'togglePanel',
			opt: 'js'
		},
		{
			name: 'showResultPanel',
			label: 'Show Result Panel',
			checked: 'checked="checked"',
			action: 'togglePanel',
			opt: 'result'
		}
	]

	options.forEach((settings) => {
		const html = template
			.replace('{name}', settings.name)
			.replace('{label}', settings.label)
			.replace('{checked}', settings.checked)
			.replace('{action}', settings.action)
			.replace('{opt}', settings.opt)

		const el = document.createElement('p')
		el.innerHTML = html

		el.querySelector('input').addEventListener('change', (e) => {
			const action = e.target.dataset.action

			if (Fiddler.hasOwnProperty(action) && typeof Fiddler[action] === 'function') {
				Fiddler[action](e.target.dataset.opt)
			}
		})

		editorOptionsContainer.appendChild(el)
	})
}

const Fiddler = document.Fiddler = {

	toggleSidebar() {
		document.body.classList.toggle('fiddler--no-sidebar')
	},

	panelStates: {
		html: true,
		css: true,
		js: true,
		result: true
	},

	presentationMode: {
		enabled: false,
		editorFontSize: 18
	},

	editorFontSize: {
		max: 18,
		min: 14,
		base: 14,
		value: 14,
		isValid(value) {
			return value <= this.max && value >= this.min
		}
	},

	togglePanel(panel) {
		if (!panel) {
			return
		}

		Fiddler.panelStates[panel] = !Fiddler.panelStates[panel]

		document.body.classList.toggle(`fiddler--no-${panel}-panel`)
	},

	togglePresentationMode() {
		Fiddler.presentationMode.enabled = !Fiddler.presentationMode.enabled
		document.body.classList.toggle(`fiddler--presentation-mode`)

		Fiddler.setEditorFontSize(
			Fiddler.presentationMode.enabled ?
				Fiddler.presentationMode.editorFontSize
				: Fiddler.editorFontSize.base
		)
	},

	adjustEditorFontSize(amount) {
		const newFontSize = Fiddler.editorFontSize.value + amount
		if (!Fiddler.editorFontSize.isValid(newFontSize)) {
			return
		}

		document.body.classList.remove(`fiddler--editor-font-size-${Fiddler.editorFontSize.value}`)
		document.body.classList.add(`fiddler--editor-font-size-${newFontSize}`)
	},

	setEditorFontSize(newFontSize) {
		if (!Fiddler.editorFontSize.isValid(newFontSize)) {
			return
		}

		document.body.classList.remove(`fiddler--editor-font-size-${Fiddler.editorFontSize.value}`)
		document.body.classList.add(`fiddler--editor-font-size-${Fiddler.editorFontSize.value = newFontSize}`)
	}

}
