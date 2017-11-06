const childProcess = require('child_process');
const electron = require('electron');
const gulp = require('gulp');

gulp.task('start', ['build', 'watch'], () => {
	childProcess.spawn(electron, ['.'], {
			stdio: 'inherit'
		})
		.on('data', console.log.bind(console))
		.on('close', process.exit.bind(process));
});
