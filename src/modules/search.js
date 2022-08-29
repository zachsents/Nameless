import lunr from "lunr"
import { Action, createActionNode } from "../nodes/actions"
import { createEventNode, Event } from "../nodes/events"
import { createPrimitiveNode, Primitive } from "../nodes/primitives"
import { createStateNode, State } from "../nodes/states"
import { createTransformNode, Transform } from "../nodes/transforms"

const docs = {
    ...prepDocumentsForSearch(Action, "action", createActionNode),
    ...prepDocumentsForSearch(Event, "event", createEventNode),
    ...prepDocumentsForSearch(Primitive, "primitive", createPrimitiveNode),
    ...prepDocumentsForSearch(State, "state", createStateNode),
    ...prepDocumentsForSearch(Transform, "transform", createTransformNode),
}

const searchIndex = lunr(function () {
    this.ref("_ref")
    this.field("name")
    this.field("description")
    this.field("_categories")
    this.field("_type", { boost: 10 })

    this.metadataWhitelist = ['position']

    Object.values(docs).forEach(doc => this.add(doc))
})

function prepDocumentsForSearch(collection, _type, _create) {
    return Object.fromEntries(
        Object.entries(collection).map(([id, item]) => {
            const _ref = `${_type}/${id}`
            return [
                _ref,
                {
                    ...item,
                    _ref,
                    _type,
                    _create,
                    _categories: item.categories?.join(" "),
                }
            ]
        })
    )
}

export default {
    search: query => searchIndex.search(query.trim() + "*")
        .map(result => ({
            ...result,
            doc: docs[result.ref]
        }))
}