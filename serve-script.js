const {LiveReloadCompiler} = require('@nestjs/ng-universal');

const compiler = new LiveReloadCompiler({
	projectName: 'storello-board',
});

compiler.run();
