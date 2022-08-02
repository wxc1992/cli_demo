//Loadable插件需使用Loading
import Loadable from 'react-loadable'
import Loading from '../components/loading/index';

//定义路由

global.notFound = Loadable({
	loader: () => import('../pages/_404Page'),
	loading: Loading,
});

global.HomePage = Loadable({
	loader: () => import('../pages/HomePage'),
	loading: Loading,
});

global.Instancemanagement = Loadable({
	loader: () => import('../pages/instancemanagement/index.js'),
	loading: Loading,
});
global.Instancelist = Loadable({
	loader: () => import('../pages/instancemanagement/instancelist.js'),
	loading: Loading,
});

