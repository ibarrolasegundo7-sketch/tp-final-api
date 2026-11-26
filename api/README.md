# tp-final

api: https://tp-final-api.vercel.app/

Documentación: https://tp-final-api.vercel.app/docs

## Deploy

La API se despliega como un proyecto FastAPI independiente en Vercel (plan Hobby).
`DATABASE_URL` está configurada como secreto de producción. Los archivos `.env`
y el entorno virtual se excluyen del deploy mediante `.vercelignore`.

Para publicar cambios, ejecutar desde `api/`:

```sh
vercel deploy --prod --scope segus-projects-849c60d2
```

El frontend no se despliega con este proyecto. CORS permite el origen local
`http://127.0.0.1:3000`.

Vercel puede tener arranques en frío; este plan no garantiza una instancia
permanentemente encendida. La conexión automática con GitHub quedó pendiente;
los despliegues se realizan con el comando anterior.
