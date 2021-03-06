import { flow, set, unset } from 'immutadot'

import organizationCrud, { fetchUserOrganizations } from 'firebase/organizations'
import { ROLES } from 'firebase/constants'

export const create = async (action, store, { router }) => {
  const data = action.payload
  const { uid } = store.auth.get()
  const newUserOrganization = flow(set(`members.${uid}`, ROLES.OWNER), set(ROLES.OWNER, uid))(data)

  store.ui.loaders.update({ isOrganizationSaving: true })
  const ref = await organizationCrud.create(newUserOrganization)
  store.ui.loaders.update({ isOrganizationSaving: false })

  store.data.organizations.add({ id: ref.id, ...newUserOrganization })
  router.push('organizer-organization-page', { organizationId: ref.id })
}

export const update = async (action, store, { router }) => {
  const data = action.payload

  store.ui.loaders.update({ isOrganizationSaving: true })
  await organizationCrud.update(data)
  store.ui.loaders.update({ isOrganizationSaving: false })

  store.data.organizations.update(data)
  router.push('organizer-organization-page', { organizationId: data.id })
}

export const get = async (action, store, { router }) => {
  const organizationId = action.payload || router.getParam('organizationId')
  if (!organizationId) return
  if (!store.data.organizations.hasKey(organizationId)) {
    const ref = await organizationCrud.read(organizationId)
    if (!ref.exists) return
    store.data.organizations.add({ id: organizationId, ...ref.data() })
  }
}

export const ofUser = async (action, store) => {
  const { uid } = store.auth.get()
  const organizations = await fetchUserOrganizations(uid)
  store.data.organizations.set(organizations)
}

export const setMember = async (action, store, { router }) => {
  const { uid, organizationId, role } = action.payload
  const organization = store.data.organizations.get(organizationId)
  const updated = set(organization, `members.${uid}`, role || ROLES.REVIEWER)
  await organizationCrud.update(updated)
  store.data.organizations.update(updated)
  router.push('organizer-organization-page', { organizationId })
}

export const removeMember = async (action, store, { router }) => {
  const { uid, organizationId, leave } = action.payload
  const organization = store.data.organizations.get(organizationId)
  const updated = unset(organization, `members.${uid}`)
  if (!leave) {
    await organizationCrud.update(updated)
  }
  store.data.organizations.update(updated)
  if (leave) {
    router.push('organizer-organizations')
  } else {
    router.push('organizer-organization-page', { organizationId })
  }
}
