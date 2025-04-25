import fs from 'fs'
import path from 'path';

const [, , name] = process.argv ?? [];

if (!name) {
  console.error('请提供页面名称');
}

const views = path.join(__dirname, `@/views/${name}`);
const to = path.join(__dirname, `${name}/index.tsx`);
const routes = path.join(__dirname, '@/routes/index.tsx');

if (!fs.existsSync(views)) {
  fs.mkdirSync(views, { recursive: true });
}

const [start, ...end] = name.split('');
const component_name = start.toLocaleUpperCase() + end;
const template = `
export default function ${component_name}(){
  return (
    <div>
      ${component_name}
    </div>
  )
}
`

fs.writeFileSync(to, template);

let content = fs.readFileSync(routes, 'utf-8');

const router = `{
  path: '/${name}',
  element: lazy(() => import('${name}'))
}`;

if (!content.includes(router)) {
  content = content.replace(
    'const router = createRouter([',
    `const router = createRouter([\n${router}`
  );
  fs.writeFileSync(routes, content);
}

console.log(`✅ 页面 ${name} 已创建，并已添加到 routes/index.tsx`);


