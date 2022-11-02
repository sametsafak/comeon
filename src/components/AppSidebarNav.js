import { defineComponent, h, onMounted, ref, resolveComponent } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import {
  CBadge,
  CSidebarNav,
  CNavItem,
  CNavGroup,
  CNavTitle,
} from '@coreui/vue-pro'
import nav from '@/_nav.js'

const normalizePath = (path) =>
  decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(html)$/, '')

const isActiveLink = (route, link) => {
  if (link === undefined) {
    return false
  }

  if (route.hash === link) {
    return true
  }

  const currentPath = normalizePath(route.path)
  const targetPath = normalizePath(link)

  return currentPath === targetPath
}

const isActiveItem = (route, item) => {
  if (isActiveLink(route, item.to)) {
    return true
  }

  if (item.items) {
    return item.items.some((child) => isActiveItem(route, child))
  }

  return false
}

const AppSidebarNav = defineComponent({
  name: 'AppSidebarNav',
  props: {
    currentMemberAcl: {
      type: Array,
      default() {
        return []
      },
    },
  },
  components: {
    CNavItem,
    CNavGroup,
    CNavTitle,
  },
  setup(props) {
    const route = useRoute()
    const firstRender = ref(true)

    onMounted(() => {
      firstRender.value = false
    })

    const renderItem = (item) => {
      if (item.items) {
        return h(
          CNavGroup,
          {
            ...(firstRender.value && {
              visible: item.items.some((child) => isActiveItem(route, child)),
            }),
          },
          {
            togglerContent: () => [
              h(resolveComponent('CIcon'), {
                customClassName: 'nav-icon',
                name: item.icon,
              }),
              item.name,
            ],
            default: () => item.items.map((child) => renderItem(child)),
          },
        )
      }

      return item.to
        ? h(
            RouterLink,
            {
              to: item.to,
              custom: true,
            },
            {
              default: (props) =>
                h(
                  resolveComponent(item.component),
                  {
                    active: props.isActive,
                    // href: props.href,
                    // onClick: () => props.navigate(),
                  },
                  {
                    default: () =>
                      h(
                        RouterLink,
                        {
                          to: props.href,
                          class: 'nav-link' + (props.isActive ? ' active' : ''),
                          onClick: () => props.navigate(),
                        },
                        {
                          default: () => [
                            item.icon &&
                              h(resolveComponent('CIcon'), {
                                customClassName: 'nav-icon',
                                name: item.icon,
                              }),
                            item.name,
                            item.badge &&
                              h(
                                CBadge,
                                {
                                  class: 'ms-auto',
                                  color: item.badge.color,
                                },
                                {
                                  default: () => item.badge.text,
                                },
                              ),
                          ],
                        },
                      ),
                  },
                ),
            },
          )
        : h(
            resolveComponent(item.component),
            {},
            {
              default: () => item.name,
            },
          )
    }

    const getFilteredNavItemsByAcl = (nav, currentMemberAcl) => {
      // if no acl, member is accepted that not logged in
      if (!currentMemberAcl) {
        currentMemberAcl = ['NOT_LOGGED_IN_MEMBER']
      }

      // if VUE_APP_DEV_ACL is true, make every nav items visible
      if (currentMemberAcl?.includes('DEV')) {
        return nav
      }

      const isValidAclForNavItem = (item) => {
        // if nav item should visible to everyone
        if (item.acl === ['NOT_LOGGED_IN_MEMBER']) {
          return true
        }

        // if nav item should visible to members that has specific acl
        // even if they have NOT_LOGGED_IN_MEMBER, some pages can be invisible for some specific acl (like anomaly details page)
        return item.acl?.some((a) => currentMemberAcl?.includes(a))
      }

      const navFilterer = (arr) => {
        return arr.reduce(
          (acc, navItem) => {
            // acc -> short for "accumulator" (array)
            // navItem -> the current nav item

            // to prevent deep mutation (spread operator doesn't provide deep clone)
            const newItem = JSON.parse(JSON.stringify(navItem))

            if (navItem.items) {
              // recursive call for sub 'item' arrays
              newItem.items = navFilterer(navItem.items)
            }
            if (isValidAclForNavItem(newItem)) {
              // here's where acc takes the new item
              acc.push(newItem)
            }
            // we always have to return acc
            return acc
          },
          // initialize accumulator (empty array)
          [],
        )
      }
      return navFilterer(nav)
    }

    return () =>
      h(
        CSidebarNav,
        {},
        {
          default: () => {
            return getFilteredNavItemsByAcl(nav, props.currentMemberAcl).map(
              (item) => renderItem(item),
            )
          },
        },
      )
  },
})
export { AppSidebarNav }
