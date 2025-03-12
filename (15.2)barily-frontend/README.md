# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```


  // useCallback(async ()=>{
  //   const fetchdata= async()=>{
  //     setLoading(true);
  //     try{
  //       const res = await axios.get(`${Backend_url}/api/v1/content/${filter}`,{
  //          headers:{
  //             "Authorization":localStorage.getItem("token")
  //           }
  //        })
  //        // it will Update state only if data is different
  //     setContent1(prevcontent =>{
  //        if(!isEqual(prevcontent,res.data.content)){
  //         return res.data.content;
  //        }
  //        return prevcontent;
  //     })

  //    } catch(e){
  //     console.error("error fetching data",e);
  //     alert("error fetching content or backend crashed")
  //   }
  //   setLoading(false);
    
  //   } 

  //   fetchdata() ;                          // 1st time to get data
  //   let interval = setInterval(()=> {
  //     fetchdata();

  //   },10*1000)                                // refresh content eery 10 sec

  //   return ()=>{
  //     clearInterval(interval);
  //   }


  // },[filter])  // as content1 also there so when content chng then only re-renders






   <!-- const lastcontentRef= useRef<content1[]>([]);
  const intervalRef =useRef<number | null>(null)

const fetchdata = useCallback(async ()=>{
  setLoading(true);
  try{
    const res= await axios.get(`${Backend_url}/api/v1/content/${filter}`,{
      headers:{
        "Authorization":localStorage.getItem("token"),
      }
    })
    console.log("Fetched data:", res.data.content);
    console.log("Previous data:", lastcontentRef.current);

    if(!isEqual(lastcontentRef.current ,res.data.content)){
      console.log("Updating state because content changed.");
      lastcontentRef.current=res.data.content;
      setContent1(res.data.content)
    }
    else{
      console.log("skipping state update content unchanged")
    }
  }catch(e){
    console.error("error fetching data",e);
    alert("Error fetching content or backend crashed");
  }
  setLoading(false);

},[filter])

const startPolling = useCallback(() => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }
  intervalRef.current = setInterval(() => {
    console.log("Fetching data every 10s...");
    fetchdata();
  }, 10 * 1000);
}, [fetchdata]);

useEffect(()=>{
  fetchdata();
  startPolling();

  return ()=>{
    if(intervalRef.current){
      clearInterval(intervalRef.current)
    }
  }

},[fetchdata])
 previous approch -->


<!-- //websitelink -->
 <!-- https://jsfiddle.net/ -->