import '../scss/main.scss';
import 'what-input';

class Setup {
	constructor(){
		this.log = 'Start finoz/annaemich';
	};
	init() {
		console.log(this.log);
	}
}
let setup = new Setup();
setup.init();
