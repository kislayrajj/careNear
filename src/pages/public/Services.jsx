const Services = () => {
  return (
    <div className="pt-16 max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Services</h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-5 border rounded-xl">
          <h3 className="font-semibold mb-2">Find Doctors</h3>
          <p className="text-sm text-slate-500">
            Search doctors by specialization and availability.
          </p>
        </div>

        <div className="p-5 border rounded-xl">
          <h3 className="font-semibold mb-2">Find Medicines</h3>
          <p className="text-sm text-slate-500">
            Check pharmacy inventory and availability instantly.
          </p>
        </div>

        <div className="p-5 border rounded-xl">
          <h3 className="font-semibold mb-2">Digital Prescriptions</h3>
          <p className="text-sm text-slate-500">
            Manage prescriptions efficiently.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Services;