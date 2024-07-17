import{o as s,c as n,a}from"./app.51e46c58.js";const t='{"title":"数据mock&联调","description":"","frontmatter":{},"headers":[{"level":2,"title":"开发环境","slug":"开发环境"},{"level":3,"title":"跨域设置","slug":"跨域设置"},{"level":2,"title":"接口请求","slug":"接口请求"},{"level":2,"title":"axios 配置","slug":"axios-配置"},{"level":3,"title":"全局 axios 配置说明","slug":"全局-axios-配置说明"},{"level":2,"title":"Mock 服务","slug":"mock-服务"},{"level":3,"title":"本地 Mock","slug":"本地-mock"},{"level":3,"title":"线上 mock","slug":"线上-mock"}],"relativePath":"guide/mock.md","lastUpdated":1721205967753}',p={},o=a('<h1 id="数据mock-联调"><a class="header-anchor" href="#数据mock-联调" aria-hidden="true">#</a> 数据mock&amp;联调</h1><h2 id="开发环境"><a class="header-anchor" href="#开发环境" aria-hidden="true">#</a> 开发环境</h2><p>如果前端应用和后端接口服务器没有运行在同一个主机上，你需要在开发环境下将接口请求代理到接口服务器。</p><p>如果是同一个主机，可以直接请求具体的接口地址。</p><h3 id="跨域设置"><a class="header-anchor" href="#跨域设置" aria-hidden="true">#</a> 跨域设置</h3><p>在 <code>vite.config.ts</code> 配置文件中，提供了 server 的 proxy 功能，用于代理 API 请求。</p><div class="language-ts"><pre><code>server<span class="token operator">:</span> <span class="token punctuation">{</span>\n  proxy<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;/api&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>\n      target<span class="token operator">:</span> <span class="token string">&#39;http://localhost:3000&#39;</span><span class="token punctuation">,</span>\n      changeOrigin<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      ws<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      <span class="token function-variable function">rewrite</span><span class="token operator">:</span> <span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> path<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">^/api</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span>\n</code></pre></div><p>配置接口前缀，可以在对应的 <code>env</code> 文件中，修改 <code>VITE_API_BASE_PATH</code> 的值</p><div class="tip custom-block"><p class="custom-block-title">注意</p><p>该配置只能作用于 本地开发环境。</p><p>从浏览器控制台的 Network 看，请求是 <code>http://localhost:3000/api/xxx</code>，这是因为 proxy 配置不会改变本地请求的 url。</p></div><h2 id="接口请求"><a class="header-anchor" href="#接口请求" aria-hidden="true">#</a> 接口请求</h2><p>在本项目中，所有的接口数据都是使用 <code>Mock</code> 模拟</p><p>接口统一存放于 <a href="https://github.com/kailong321200875/vue-element-plus-admin/tree/master/src/api" target="_blank" rel="noopener noreferrer">src/api/</a> 下面管理</p><p>以获取列表接口为例:</p><p>在 <strong>src/api/</strong> 内新建模块文件，其中参数与返回值最好定义一下类型，方便校验。虽然麻烦，但是后续维护字段很方便。</p><div class="tip custom-block"><p class="custom-block-title">提示</p><p>类型定义文件可以抽取出去统一管理，具体参考项目</p></div><div class="language-ts"><pre><code><span class="token keyword">import</span> request <span class="token keyword">from</span> <span class="token string">&#39;@/axios&#39;</span>\n<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> TableData <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./types&#39;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">getTableListApi</span> <span class="token operator">=</span> <span class="token punctuation">(</span>params<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">{</span> url<span class="token operator">:</span> <span class="token string">&#39;/example/list&#39;</span><span class="token punctuation">,</span> params <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">getTreeTableListApi</span> <span class="token operator">=</span> <span class="token punctuation">(</span>params<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">{</span> url<span class="token operator">:</span> <span class="token string">&#39;/example/treeList&#39;</span><span class="token punctuation">,</span> params <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> saveTableApi <span class="token operator">=</span> <span class="token punctuation">(</span>data<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>TableData<span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>IResponse<span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token punctuation">{</span> url<span class="token operator">:</span> <span class="token string">&#39;/example/save&#39;</span><span class="token punctuation">,</span> data <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> getTableDetApi <span class="token operator">=</span> <span class="token punctuation">(</span>id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>IResponse<span class="token operator">&lt;</span>TableData<span class="token operator">&gt;&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">{</span> url<span class="token operator">:</span> <span class="token string">&#39;/example/detail&#39;</span><span class="token punctuation">,</span> params<span class="token operator">:</span> <span class="token punctuation">{</span> id <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> delTableListApi <span class="token operator">=</span> <span class="token punctuation">(</span>ids<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>IResponse<span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token punctuation">{</span> url<span class="token operator">:</span> <span class="token string">&#39;/example/delete&#39;</span><span class="token punctuation">,</span> data<span class="token operator">:</span> <span class="token punctuation">{</span> ids <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n</code></pre></div><h2 id="axios-配置"><a class="header-anchor" href="#axios-配置" aria-hidden="true">#</a> axios 配置</h2><p><strong>axios</strong> 请求封装存放于 <a href="https://github.com/kailong321200875/vue-element-plus-admin/blob/master/src/axios" target="_blank" rel="noopener noreferrer">src/axios</a> 中。</p><h3 id="全局-axios-配置说明"><a class="header-anchor" href="#全局-axios-配置说明" aria-hidden="true">#</a> 全局 axios 配置说明</h3><p>axios 全局配置放在 <a href="https://github.com/kailong321200875/vue-element-plus-admin/blob/master/src/constants" target="_blank" rel="noopener noreferrer">src/constants</a> 中。</p><div class="tip custom-block"><p class="custom-block-title">注意</p><p>更改之后，将影响所有的请求。</p></div><div class="language-ts"><pre><code><span class="token comment">/**\n * 请求成功状态码\n */</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SUCCESS_CODE</span> <span class="token operator">=</span> <span class="token number">0</span>\n\n<span class="token comment">/**\n * 请求contentType\n */</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">CONTENT_TYPE</span> <span class="token operator">=</span> <span class="token string">&#39;application/json&#39;</span>\n\n<span class="token comment">/**\n * 请求超时时间\n */</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">REQUEST_TIMEOUT</span> <span class="token operator">=</span> <span class="token number">60000</span>\n</code></pre></div><h2 id="mock-服务"><a class="header-anchor" href="#mock-服务" aria-hidden="true">#</a> Mock 服务</h2><p>Mock 数据是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发独立自主，不会被服务端的开发进程所阻塞。</p><p>本项目使用 <a href="https://github.com/vbenjs/vite-plugin-mock" target="_blank" rel="noopener noreferrer">vite-mock-plugin</a> 来进行 mock 数据处理。<strong>项目内 mock 服务分本地和线上</strong>。</p><h3 id="本地-mock"><a class="header-anchor" href="#本地-mock" aria-hidden="true">#</a> 本地 Mock</h3><p>本地 mock 采用 Node.js 中间件进行参数拦截（不采用 mock.js 的原因是本地开发看不到请求参数和响应结果）。</p><h4 id="如何新增-mock-接口"><a class="header-anchor" href="#如何新增-mock-接口" aria-hidden="true">#</a> 如何新增 mock 接口</h4><p>如果你想添加 mock 数据，只要在根目录下找到 mock 文件，添加对应的接口，对其进行拦截和模拟数据。</p><p>在 mock 文件夹内新建文件</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>文件新增后会自动更新，不需要手动重启，可以在代码控制台查看日志信息 mock 文件夹内会自动注册</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>mock 的值可以直接使用 <a href="http://mockjs.com/" target="_blank" rel="noopener noreferrer">mock.js</a> 的语法。</p></div><h4 id="接口有了，如何去掉-mock"><a class="header-anchor" href="#接口有了，如何去掉-mock" aria-hidden="true">#</a> 接口有了，如何去掉 mock</h4><p>可以在对应的 <code>env</code> 文件中设置 <code>VITE_USE_MOCK</code> 为 <code>false</code> ，如果想要更彻底一点，可以在vite.config.ts中删除 <code>viteMockServe</code> 对应的代码。</p><h3 id="线上-mock"><a class="header-anchor" href="#线上-mock" aria-hidden="true">#</a> 线上 mock</h3><p>由于该项目是一个展示类项目，线上也是用 mock 数据，所以在打包后同时也集成了 mock。通常项目线上一般为正式接口。</p><p>项目线上 mock 采用的是 <a href="http://mockjs.com/" target="_blank" rel="noopener noreferrer">mock.js</a> 进行 mock 数据模拟。</p>',37);p.render=function(a,t,p,e,c,l){return s(),n("div",null,[o])};export default p;export{t as __pageData};