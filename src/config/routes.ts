export default {
  defaults: {
    source: '/',
    returnBase: '/login',
  },
  privates: {
    home: {
      path: '/',
      routeFragment: '/',
      next: {},
    },
    courses: {
      path: '/cursos',
      routeFragment: 'cursos',
      next: {
        students: {
          path: '/cursos/:id/alunos',
          routeFragment: ':id/alunos',
        },
      },
    },
    collegeSubjects: {
      path: '/disciplinas',
      routeFragment: 'disciplinas',
      next: {},
    },
    students: {
      path: '/alunos',
      routeFragment: 'alunos',
      next: {},
    },
    results: {
      path: '/postar-resultados',
      routeFragment: 'postar-resultados',
      next: {},
    },
  },
  publics: {
    login: {
      path: '/login',
      routeFragment: 'login',
      next: {},
    },
    register: {
      path: '/casdastro',
      routeFragment: 'casdastro',
      next: {},
    },
  },
};
