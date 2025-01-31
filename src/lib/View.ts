import { HasId } from "./interfaces/HasId.interface"
import { Model } from "./Model"

export abstract class View<T extends Model<P>, P extends HasId> {
  regions: {[key: string]: Element} = {}
  
  constructor(
    public parent: Element,
    public model: T
  ){
    this.bindModel()
  }

  abstract template(): string
  abstract eventsMap(): {[key: string]: () => void}
  
  regionsMap(): {[key : string]: string} {
    return {}
  }

  bindRegions(fragement: DocumentFragment) {
    const regionsMap = this.regionsMap()

    for(let key in regionsMap) {
      const selector = regionsMap[key]
      const element = fragement.querySelector(selector)

      if(element) {
        this.regions[key] = element
      }
    }
  }
  
  bindModel() {
    this.model.on('change', () => {
      this.render()
    })
  }

  bindEvents(fragment: DocumentFragment){
    const eventsMap = this.eventsMap()
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':')
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  attachViews() {}

  render() {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content)
    this.bindRegions(templateElement.content)
    this.attachViews()
    this.parent.append(templateElement.content);
  }
}