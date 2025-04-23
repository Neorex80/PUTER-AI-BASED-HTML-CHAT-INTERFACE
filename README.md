# MultiModal AI Chat App

A modern, multimodal AI chat interface supporting multiple models, with a responsive, improved UI inspired by leading chat apps. Built with HTML, JavaScript, and Bootstrap for a seamless experience.

## Features
- Supports multiple AI models (GPT, Claude, Gemini, Llama, etc.)
- Large, prominent chat area for comfortable conversation
- Sidebar for model selection and new chat
- Responsive, mobile-friendly layout using Bootstrap
- Modern, clean design with custom branding
- Chat history stored locally
- Easy to extend with new models or UI components

## Brand Name
**Brand:** ModalMind

## Getting Started
1. **Clone the repository:**
   ```
   git clone <repo-url>
   cd outer
   ```
2. **Install dependencies:**
   - No build step required. Uses CDN for Bootstrap and Puter AI SDK.
3. **Run locally:**
   ```
   python -m http.server 8000
   ```
   Then open [http://localhost:8000/](http://localhost:8000/) in your browser.

## File Structure
- `chat.html` – Main HTML structure
- `chat.js` – Chat logic and model integration
- `style.css` – Custom styles
- `README.md` – Project documentation

## Customization
- Add/remove models in `chat.js` as needed
- Update branding and styles in `chat.html` and `style.css`

## License
MIT