/* eslint-disable */
let uid = 0;

class Dep {
    constructor() {
        this.id = uid ++;
        this.subs = [];
    }

    depend() {
        Dep.target.addDep(this)
    }

    addSub() {
        this.subs.push(sub)
    }

    notify() {
        this.subs.forEach(sub => sub.update())
    }
}

Dep.target = null;


class Observer {
    constructor(value) {
        this.value = value;
        this.walk(value);
    }

    walk(value) {
        Object.keys(value).forEach(key => this.convert(key, value[key]))
    }

    convert(key, val) {
        defineReactive(this.value, key, val)
    }
}

function defineReactive(obj, key, val) {
    const dep = new Dep();
    let childOb = observe(val);

    Object.defineProperty(obj, key, {
        enumerable: true, // what mean??
        configurable: true,
        get: () => {
            if (Dep.target) { // 有心的watcher
                dep.depend();
            }

            return val;
        },
        set: newVal => {
            if (val === newVal) return;
            val = newVal;
            childOb = observe(newVal)
            dep.notify();
        }
    })
}

function observe(value) {
    if (!value || typeof value !== 'object') return;
    return new Observer(value);
 }


 class Watcher {
     constructor(vm, expOrFn, cb) {
         this.depIds = {};
         this.vm = vm;
         this.cb = cb;
         this.expOrFn = expOrFn;
         this.val = this.get();
     }

     update() {
         this.run();
     }

     addDep(dep) {
         if (!this.depIds.hasOwnProperty(dep.id)) {
             dep.addSub(this);
             this.depIds[dep.id] = dep;
         }
     }

     run() {
         const val = this.get();
         if (val !== this.val) {
             this.val = val;
             this.cb.call(this.vm, val);
         }
     }

     get() {
         Dep.target = this;
         const val = this.vm._data[this.expOrFn];

         Dep.target = null;
         return val;
     }
 }


 class Vue {
     constructor(options = {}) {
         this.$options = options;

         let data = (this._data = this.$options.data);

         Object.keys(data).forEach(key => this._proxy(key)); //把 data的属性挂到vm this实例上

         observe(data);// 对data对象进行监听
     }

     $watch(expOrFun, cb) {
         new Watcher(this, expOrFun, cb);
     }

     _proxy(key) {
         Object.defineProperty(this, key, {
             configurable: true,
             enumerable: true,
             get: () => this._data[key],
             set: val => {
                 this._data[key] = val;
             }
         })
     }
 }

