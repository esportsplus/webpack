import { CustomWebpackConfiguration } from '~/types';
import parse from './parse';
import node from './node';
import web from './web';


const fn = (base: CustomWebpackConfiguration) => parse(base);

fn.node = node;
fn.web = web;


export default fn;