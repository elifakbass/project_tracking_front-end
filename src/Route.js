import AppBar from '../src/component/AppBar'
import Home from '../src/pages/personel/Home'
import YoneticiHome from '../src/pages/yonetici/Home'
import Proje from '../src/pages/yonetici/Proje'
import Personel from '../src/pages/yonetici/Personel'
import AdminHome from '../src/pages/admin/Home'
import AdminLog from '../src/pages/admin/Log'
import Page404 from './pages/page404'
import AuthLayout from './pages/auth/AuthLayout'
import Login from './pages/auth/Login'
import ProtectedPersonelRoute from './component/ProtectedPersonelRoute'
import ProtectedYoneticiRoute from './component/ProtectedYoneticiRoute'
import ProtectedAdminRoute from './component/ProtectedAdminRoute'



const routes=[
    {
        path:'/',
        element:<AppBar/>,
        auth:true,
        children: [
            {
                index:true,
                element:<Home/>

            },

        ],

    },
    {
        path:'/yonetici',
        element:<AppBar/>,
        yonetici:true,
        children:[
            {
                index:true,
                element:<YoneticiHome/>

            },
            {
                path:'personel',
                element:<Personel/>
            },
            {
                path:'proje',
                element:<Proje/>
            }   

        ]
    },
    {
        path:'/admin',
        element:<AppBar/>,
        admin:true,
        children:[
            {
                index:true,
                element:<AdminHome/>,
            },
            {
                path:'log',
                element:<AdminLog/>
            }

        ]
    },
    {
        path:'/auth',
        element:<AuthLayout/>,
        children:[
            {
                path:'login',
                element:<Login/>
            }
        ]
    },
    {
        path:"*",
        element:<Page404/>
    }


]


const authMap = routes => routes.map(route =>{
    if(route?.auth){
        route.element = <ProtectedPersonelRoute>{route.element}</ProtectedPersonelRoute>
    }

    if(route?.yonetici){
        route.element = <ProtectedYoneticiRoute>{route.element}</ProtectedYoneticiRoute>
    }

    if(route?.admin){
        route.element = <ProtectedAdminRoute>{route.element}</ProtectedAdminRoute>
    }

    if(route?.children){
        route.children=authMap(route.children);
    }
    return route;

})

export default authMap(routes);