<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <!-- 顶部导航 -->
    <header class="sticky top-0 bg-white shadow-sm z-50">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <div class="flex items-center space-x-2">
          <el-icon class="text-blue-600 text-2xl"><Reading /></el-icon>
          <h1 class="text-xl font-bold text-blue-600">简约博客</h1>
        </div>
        <nav class="hidden md:flex space-x-8">
          <a
            href="#"
            class="font-medium hover:text-blue-600 transition-colors cursor-pointer"
            >首页</a
          >
          <a
            href="#"
            class="font-medium hover:text-blue-600 transition-colors cursor-pointer"
            >文章分类</a
          >
          <a
            href="#"
            class="font-medium hover:text-blue-600 transition-colors cursor-pointer"
            >归档</a
          >
          <a
            href="#"
            class="font-medium hover:text-blue-600 transition-colors cursor-pointer"
            >关于</a
          >
        </nav>
        <button
          class="md:hidden !rounded-button whitespace-nowrap cursor-pointer"
          @click="toggleMobileMenu"
        >
          <el-icon><Menu /></el-icon>
        </button>
      </div>
      <!-- 移动端菜单 -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-white shadow-md absolute w-full"
      >
        <div class="container mx-auto px-4 py-2">
          <nav class="flex flex-col space-y-3 py-3">
            <a
              href="#"
              class="font-medium hover:text-blue-600 transition-colors cursor-pointer"
              >首页</a
            >
            <a
              href="#"
              class="font-medium hover:text-blue-600 transition-colors cursor-pointer"
              >文章分类</a
            >
            <a
              href="#"
              class="font-medium hover:text-blue-600 transition-colors cursor-pointer"
              >归档</a
            >
            <a
              href="#"
              class="font-medium hover:text-blue-600 transition-colors cursor-pointer"
              >关于</a
            >
          </nav>
        </div>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="container mx-auto px-4 py-8 flex flex-col md:flex-row">
      <!-- 左侧内容区 -->
      <div class="w-full md:w-2/3 md:pr-8">
        <!-- 文章列表 -->
        <div class="space-y-8">
          <article
            v-for="(post, index) in blogPosts"
            :key="index"
            class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div class="p-6">
              <div
                class="flex items-center space-x-2 text-sm text-gray-500 mb-3"
              >
                <span>{{ post.date }}</span>
                <span>•</span>
                <span>{{ post.readTime }} 分钟阅读</span>
                <span>•</span>
                <span>{{ post.category }}</span>
              </div>
              <h2
                class="text-xl font-bold mb-3 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {{ post.title }}
              </h2>
              <p class="text-gray-600 mb-4">{{ post.summary }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(tag, tagIndex) in post.tags"
                  :key="tagIndex"
                  class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >{{ tag }}</span
                >
              </div>
            </div>
          </article>
        </div>

        <!-- 分页 -->
        <div class="mt-10 flex justify-center">
          <el-pagination
            layout="prev, pager, next"
            :total="50"
            :page-size="5"
            background
            class="!rounded-button whitespace-nowrap"
          />
        </div>
      </div>

      <!-- 右侧侧边栏 -->
      <aside
        class="w-full md:w-1/3 mt-8 md:mt-0 md:sticky md:top-24 md:self-start"
      >
        <!-- 作者简介 -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-16 h-16 rounded-full overflow-hidden">
              <img
                :src="authorImage"
                alt="作者头像"
                class="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h3 class="font-bold text-lg">陈小明</h3>
              <p class="text-gray-500 text-sm">前端开发工程师</p>
            </div>
          </div>
          <p class="text-gray-600 text-sm">
            热爱技术分享，专注于前端开发和用户体验设计。平时喜欢阅读和旅行，寻找灵感。
          </p>
        </div>

        <!-- 文章分类 -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 class="font-bold text-lg mb-4 flex items-center">
            <el-icon class="mr-2"><Folder /></el-icon>
            文章分类
          </h3>
          <ul class="space-y-2">
            <li v-for="(category, index) in categories" :key="index">
              <a
                href="#"
                class="flex justify-between items-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span>{{ category.name }}</span>
                <span class="bg-gray-100 text-xs px-2 py-1 rounded-full">{{
                  category.count
                }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- 热门文章 -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 class="font-bold text-lg mb-4 flex items-center">
            <el-icon class="mr-2"><Star /></el-icon>
            热门文章
          </h3>
          <ul class="space-y-4">
            <li
              v-for="(article, index) in popularArticles"
              :key="index"
              class="border-b border-gray-100 pb-3 last:border-0 last:pb-0"
            >
              <a
                href="#"
                class="hover:text-blue-600 transition-colors cursor-pointer"
              >
                <h4 class="font-medium line-clamp-2">{{ article.title }}</h4>
                <div class="text-xs text-gray-500 mt-1">
                  {{ article.views }} 阅读
                </div>
              </a>
            </li>
          </ul>
        </div>

        <!-- 标签云 -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="font-bold text-lg mb-4 flex items-center">
            <el-icon class="mr-2"><Collection /></el-icon>
            标签云
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in tags"
              :key="index"
              class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors"
              :class="{ 'bg-blue-100 text-blue-600': tag.isPopular }"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>
      </aside>
    </main>

    <!-- 返回顶部按钮 -->
    <button
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
    >
      <el-icon><ArrowUp /></el-icon>
    </button>

    <!-- 页脚 -->
    <footer class="bg-white border-t border-gray-200 mt-12">
      <div class="container mx-auto px-4 py-8">
        <div class="text-center text-gray-500 text-sm">
          <p>© 2025 简约博客 - 分享技术与生活</p>
          <p class="mt-2">
            本站已运行 {{ runningDays }} 天 | 总访问量 {{ totalVisits }} 次
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import {
  Reading,
  Menu,
  Folder,
  Star,
  Collection,
  ArrowUp,
} from '@element-plus/icons-vue';

// 移动端菜单状态
const mobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// 返回顶部按钮状态
const showBackToTop = ref(false);

// 监听滚动事件
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

// 返回顶部功能
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 作者头像
const authorImage =
  'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20an%20Asian%20male%20in%20his%2030s%20with%20short%20black%20hair%20and%20glasses%2C%20wearing%20a%20casual%20business%20attire%2C%20smiling%20warmly%20at%20camera%2C%20soft%20lighting%2C%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=400&height=400&seq=1&orientation=squarish';

// 博客文章数据
const blogPosts = [
  {
    title: '如何优化React应用性能：实用技巧与最佳实践',
    date: '2025-05-20',
    readTime: 8,
    category: '前端开发',
    summary:
      '本文详细介绍了提升React应用性能的多种方法，包括组件懒加载、memo优化、虚拟列表实现等技术，并提供了实际案例分析。',
    tags: ['React', '性能优化', '前端开发'],
  },
  {
    title: 'TypeScript高级类型系统详解：让你的代码更安全',
    date: '2025-05-15',
    readTime: 10,
    category: 'TypeScript',
    summary:
      '深入探讨TypeScript的高级类型功能，包括条件类型、映射类型、类型守卫等，帮助你构建更健壮的应用程序。',
    tags: ['TypeScript', '前端开发', '类型系统'],
  },
  {
    title: '从零开始构建微前端架构：原理与实践',
    date: '2025-05-10',
    readTime: 15,
    category: '架构设计',
    summary:
      '本文介绍了微前端的核心概念、实现方式和常见挑战，并通过一个实际项目展示如何构建可扩展的微前端应用。',
    tags: ['微前端', '架构设计', '前端开发'],
  },
  {
    title: 'CSS Grid布局完全指南：构建复杂页面的简单方法',
    date: '2025-05-05',
    readTime: 7,
    category: 'CSS',
    summary:
      '详细讲解CSS Grid布局的基础知识和高级技巧，包括响应式设计、网格模板和自动布局等内容，附带多个实用示例。',
    tags: ['CSS', 'Grid布局', '响应式设计'],
  },
  {
    title: '深入理解JavaScript异步编程：从回调到Async/Await',
    date: '2025-04-28',
    readTime: 12,
    category: 'JavaScript',
    summary:
      '本文梳理了JavaScript异步编程的发展历程，详细比较了回调、Promise和Async/Await的优缺点，并提供了实际应用场景。',
    tags: ['JavaScript', '异步编程', 'Async/Await'],
  },
];

// 分类数据
const categories = [
  { name: '前端开发', count: 28 },
  { name: 'JavaScript', count: 16 },
  { name: 'CSS', count: 12 },
  { name: 'React', count: 9 },
  { name: 'Vue', count: 7 },
  { name: '架构设计', count: 5 },
];

// 热门文章
const popularArticles = [
  { title: '2025年前端开发趋势预测：新技术与新挑战', views: 2548 },
  { title: '10个提高代码质量的TypeScript技巧', views: 1893 },
  { title: '深入浅出Vue3组合式API：从入门到精通', views: 1675 },
  { title: '前端性能优化完全指南', views: 1432 },
  { title: 'CSS变量的高级应用：构建灵活的主题系统', views: 1289 },
];

// 标签云
const tags = [
  { name: 'JavaScript', isPopular: true },
  { name: 'React', isPopular: true },
  { name: 'Vue', isPopular: false },
  { name: 'TypeScript', isPopular: true },
  { name: 'CSS', isPopular: false },
  { name: '性能优化', isPopular: false },
  { name: '前端开发', isPopular: true },
  { name: '架构设计', isPopular: false },
  { name: 'Node.js', isPopular: false },
  { name: 'Webpack', isPopular: false },
  { name: '响应式设计', isPopular: false },
  { name: '微前端', isPopular: true },
];

// 网站统计数据
const runningDays = 365;
const totalVisits = 158976;
</script>

<style scoped>
.el-pagination {
  justify-content: center;
}

.el-pagination .el-pager li {
  border-radius: 4px;
}

.el-pagination .el-pager li.is-active {
  background-color: #3b82f6;
  color: white;
}
</style>
