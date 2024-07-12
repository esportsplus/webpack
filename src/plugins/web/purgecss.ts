import { exec } from 'child_process';
import { Configuration } from '~/types';


// Webpack plugin doesn't read html/templates from node_modules
// so we have to run the purgecss command on final output
export default (config: Configuration, options: { css?: string, js?: string, output?: string, variables?: boolean } = {}) => {
    options.css ??= `${config.output.path}/**/*.css`;
    options.js ??= `${config.output.path}/**/*.js`;
    options.output ??= '.';

    config.plugins.push({
        apply: (compiler) => {
            compiler.hooks.shutdown.tap('PurgeCSS', () => {
                exec(
                    `npx purgecss --css ${options.css} --content ${options.js} --output ${options.output} ${options.variables && '--variables'}`,
                    (_, stdout, stderr) => {
                        if (stdout) {
                            process.stdout.write(stdout);
                        }

                        if (stderr) {
                            process.stderr.write(stderr);
                        }
                    }
                );
            });
        }
    });
};